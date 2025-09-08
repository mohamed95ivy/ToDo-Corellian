import { graphql, useMutation } from 'react-relay';
import { Flex, TextField, TextArea, Button } from '@adobe/react-spectrum';
import { useState } from 'react';

const CreateMutation = graphql`
  mutation NewTaskFormCreateMutation($input: CreateTaskInput!) {
    createTask(input: $input) { task { id title description status } }
  }
`;

export default function NewTaskForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [commit, inFlight] = useMutation(CreateMutation);

  const submit = () => {
    if (!title.trim()) return;
    commit({
      variables: { input: { title, description: desc } },
      optimisticResponse: {
        createTask: {
          task: { id: 'client:new', title, description: desc, status: 'Pending' }
        }
      },
      onCompleted: () => { setTitle(''); setDesc(''); onCreated?.(); }, // <— trigger refetch
    });
  };

  return (
    <Flex gap="size-200" alignItems="end" wrap>
      <TextField label="Title" value={title} onChange={setTitle} width="size-4600" />
      <TextArea label="Description" value={desc} onChange={setDesc} width="size-6000" />
      <Button variant="cta" onPress={submit} isDisabled={inFlight}>Add</Button>
    </Flex>
  );
}
