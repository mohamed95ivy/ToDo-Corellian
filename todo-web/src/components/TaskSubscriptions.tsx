import { useEffect } from 'react';
import { graphql, requestSubscription } from 'react-relay';
import environment from '../relay/environment';

const Created = graphql`
  subscription TaskSubscriptionsCreatedSubscription {
    taskCreated { id title description status }
  }
`;
const Updated = graphql`
  subscription TaskSubscriptionsUpdatedSubscription {
    taskUpdated { id status }
  }
`;

export default function TaskSubscriptions() {
  useEffect(() => {
    const d1 = requestSubscription(environment, {
      subscription: Created,
      variables: {},
      updater: (store) => {
        const newTask = store.getRootField('taskCreated');
        if (!newTask) return;
        const root = store.getRoot();
        const list = root.getLinkedRecords('getAllTasks') || [];
        const exists = list.some(r => r?.getDataID() === newTask.getDataID());
        if (!exists) root.setLinkedRecords([newTask, ...list], 'getAllTasks');
      },
      onError: (e) => console.error('taskCreated sub error', e),
    });

    const d2 = requestSubscription(environment, {
      subscription: Updated,
      variables: {},
      onError: (e) => console.error('taskUpdated sub error', e),
    });

    return () => { d1.dispose(); d2.dispose(); };
  }, []);

  return null;
}
