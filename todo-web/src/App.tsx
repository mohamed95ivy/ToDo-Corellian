import { RelayEnvironmentProvider } from 'react-relay';
import environment from './relay/environment';
import { Provider, defaultTheme, View, Heading, Flex } from '@adobe/react-spectrum';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import TaskSubscriptions from './components/TaskSubscriptions';
import { useState } from 'react';


export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Provider theme={defaultTheme} colorScheme="light">
        <View padding="size-400" maxWidth="1000px" marginX="auto">
          <Heading level={2}>GraphQL TODO (Realtime)</Heading>
          <Flex direction="column" gap="size-300" marginTop="size-300">
            <NewTaskForm onCreated={() => setRefreshKey(k => k + 1)} />
            <TaskList refreshKey={refreshKey} />
            <TaskSubscriptions />
          </Flex>
        </View>
      </Provider>
    </RelayEnvironmentProvider>
  );
}
