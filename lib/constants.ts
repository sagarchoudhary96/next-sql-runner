// These can be later on move to separate file making it easier to do localisation for our app

import { EditorTab, PredefinedQuery, SavedQuery } from "@/types";

// in case we have functionality to support different languages
export const DEFAULT_STRINGS = {
  WELCOME_MESSAGE_TITLE: "Welcome to SQL Query Runner",
  WELCOME_MESSAGE_SUBTITLE: "To get started, Enter and Run a Query",
  APP_TITLE: "SQL Runner",
  IMPORT_DATA: "Import Data",
  NO_TABLES_EXIST: "No table exists",
  IMPORT_NEW_DATA_MESSAGE: "Please import data to the Editor",
  QUERY_EDITOR_PLACEHOLDER: "Write Query Here ...",
  IMPORT_DATA_DIALOG_TITLE: "Import Data",
  IMPORT_DATA_HELP_TEXT: "Select your file below to import data",
  BUTTON_OPEN_TEXT: "open",
  BUTTON_CANCEL_TEXT: "Cancel",
  BUTTON_CLOSE_TEXT: "Close",
  BUTTON_SAVE_CHANGES_TEXT: "Save Changes",
  BUTTON_UPLOAD_TEXT: "Upload",
  HEADING_COLUMNS: "Columns",
  HEADING_TABLES: "Tables",
  TABLE_ROW_DIALOG: "Row Details",
  FILE: "File:",
  HEADER_PREDEFINED_QUERIES: "Predefined Queries",
  HEADER_SAVED_QUERIES: "Saved Queries",
  SQL_QUERY_EDITOR: "SQL Query Editor",
  RUN_QUERY: "Run Query",
  NEW_TAB: "New Tab",
  TOAST_QUERY_EMPTY_MESSAGE: "Please enter a query to run.",
  TOAST_QUERY_RUN_SUCCESS_MESSAGE: "Query Ran Successfully",
  TOAST_QUERY_RUN_ERROR_MESSAGE: "Error running query. Please try again.",
};

export const HOME_TAB_ID = "home_tab";
export const DEFAULT_EDITOR_TAB: EditorTab = {
  name: "Home",
  id: HOME_TAB_ID,
  value: "home",
  canDelete: false,
  query: "",
  isActive: true,
};

export const predefinedQueries: PredefinedQuery[] = [
  {
    name: "All Customers",
    query: "SELECT * FROM customers;",
    description: "Display all customers in the system",
  },
  {
    name: "Customers by Country",
    query: "SELECT country, COUNT(*) as count FROM customers GROUP BY country;",
    description: "Count customers by country",
  },
  {
    name: "Orders shipped in last 5 days",
    query:
      "SELECT * FROM orders WHERE shippedDate >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);",
    description: "List All Orders shipped in the last 5 days",
  },
  {
    name: "All Categories",
    query: "SELECT * FROM categories;",
    description: "Display all product categories",
  },
];

export const SAVED_QUERIES: SavedQuery[] = [
  {
    id: "1",
    name: "My First Query",
    query: "SELECT * FROM users WHERE id = 1;",
  },
  {
    id: "2",
    name: "My Second Query",
    query: "SELECT * FROM orders WHERE total > 100;",
  },
  {
    id: "3",
    name: "My Third Query",
    query: "SELECT * FROM products WHERE price < 50;",
  },
];

export const DEFAULT_TABLE_PAGE_SIZE = 10;
export const TABLE_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
