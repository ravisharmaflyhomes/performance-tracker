export const DBConfig = {
    name: 'PerfTracker',
    version: 4,
    objectStoresMeta: [
      {
        store: 'User',
        storeConfig: { keyPath: 'email', autoIncrement: true },
        storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'email', keypath: 'email', options: { unique: false } },
          { name: 'password', keypath: 'password', options: { unique: false } }
        ]
      },
      {
        store: 'Performance',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'emp_name', keypath: 'emp_name', options: { unique: false } },
          { name: 'emp_email', keypath: 'emp_email', options: { unique: false } },
          { name: 'subject', keypath: 'subject', options: { unique: false } },
          { name: 'manager_email', keypath: 'manager_email', options: { unique: false } },
          { name: 'manager_name', keypath: 'manager_name', options: { unique: false } },
          { name: 'comments', keypath: 'comments', options: { unique: false } },
          { name: 'date', keypath: 'date', options: { unique: false } }
        ]
      }
    ]
  };