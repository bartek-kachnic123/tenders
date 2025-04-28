# Node.js Server Setup

This project is a Node.js application using Express, PostgreSQL, and Tailwind CSS.  
The system allows for managing tenders, including adding new ones and viewing both active and completed tenders.

It also enables users to submit bids for selected tenders.

---

## 📁 Configuration Setup

Inside the `config` folder, create a file named `config.json`.  
Configure database connection:

```json
{
  "development": {
    "username": "testuser123",
    "password": "password123",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

### For Development (with auto-reload):
```bash
npm run dev
```

### 
For Production:
```bash
npm start
```
