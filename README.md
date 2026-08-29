# Professional-readiness-sprint

I built an 'Account Explorer,' a tool that allows users to search, filter, and visualize company (Account) information. The project has two versions: an LWC component that connects live to a Salesforce Sandbox, and a local React web application that reads account data from a JSON file.

---

## Table of contents
- [Project structure](#project-structure)
- [How it was built](how-it-was-built)
- [Installation](#installation)

---

## Project structure

```
├── react-account-explorer/              # React project
│   └── README.md           # → Installation y details de React
├── salesforce-account-explorer/                # Salesforce project
│   └── README.md           # → Installation y details de Salesforce
├── Evidence/              # Evidences of the work
└── README.md               
```

---

## How it was built

For the Salesforce implementation, an Apex class named `AccountSearchController` was created to query the sandbox database and retrieve results based on the provided data and filters. Additionally, two Lightning Web Components were developed for the interface: the first, `AccountSearch`, serves as the search bar and displays the table of accounts found using the filters; the second, `Pagination`, is a reusable component that handles pagination for the retrieved accounts.

For the React version, several reusable components — such as `EmptyState`, `IndustryFilter`, `Pagination`, `SearchBar`, and `Table` — were created to build the `AccountExplorer` component, which handles account searching, filtering, and display. Additionally, two hooks were developed: `usePagination`, which eliminates the need to duplicate calculation logic required by the Pagination component; and `useAccounts`, which decouples AccountExplorer from the JSON data, making it easy to migrate to a database or another data source.

---

## Installation

This project has two independent systems. Follow the guide corresponding to each one:

- **[Salesforce Installation](./salesforce-account-explorer/README.md)** — deployment, permissions, and test data.
- **[React Installation](./react-account-explorer/README.md)** — dependencies, environment variables, and how to run the app.

---

## 📹 Demo

Click to watch the demo video:

[![Watch the demo](https://img.youtube.com/vi/1scBS-cgC1k/maxresdefault.jpg)](https://www.youtube.com/watch?v=1scBS-cgC1k)

---
