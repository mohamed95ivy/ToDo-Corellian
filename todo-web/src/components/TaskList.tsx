import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { View, Flex, ActionButton, StatusLight, Content } from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Circle from '@spectrum-icons/workflow/Circle';
import type { TaskListQuery } from './__generated__/TaskListQuery.graphql';

const TasksQuery = graphql`
  query TaskListQuery {
    allTasks {
      id
      title
      description
      status
    }
  }
`;

const ToggleMutation = graphql`
  mutation TaskListToggleMutation($id: ID!, $status: Status!) {
    updateTaskStatus(id: $id, status: $status) {
      task { __typename id status }
    }
  }
`;

type Props = { refreshKey?: number };

export default function TaskList({ refreshKey = 0 }: Props) {

  const data = useLazyLoadQuery<TaskListQuery>(
    TasksQuery,
    {},
    { fetchPolicy: 'network-only', fetchKey: refreshKey }
  );
  
  const [commit] = useMutation(ToggleMutation);

  return (
    <View backgroundColor="gray-75" padding="size-200" borderRadius="regular">
      <Flex direction="column" gap="size-150" justifyContent="space-between">
        {data.allTasks.map(t => (
          <Flex key={t.id} alignItems="center" gap="size-200">
            <Content>
              <strong>{t.title}</strong><br/>
              <span style={{ opacity: 0.7 }}>{t.description}</span>
            </Content>
            <Flex gap="size-150" alignItems="center">
              <StatusLight variant={t.status === 'COMPLETED' ? 'positive' : 'neutral'}>
                {t.status}
              </StatusLight>
              <ActionButton
                aria-label="toggle"
                onPress={() => {
                  const next = t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
                  commit({
                    variables: { id: t.id, status: next },
                    optimisticResponse: { updateTaskStatus: { task: { id: t.id, status: next } } },
                  });
                }}
              >
                {t.status === 'COMPLETED' ? <CheckmarkCircle /> : <Circle />}
              </ActionButton>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </View>
  );
}
