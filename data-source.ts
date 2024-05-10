// import { DataSource, DataSourceOptions } from "typeorm"

// export const dataSourceOptions : DataSourceOptions = {
//         "type": "better-sqlite3",
//         "database": "./data/test.sqlite",
//         "synchronize": true,
//         "entities": [
//           "src/entities/*.ts"
//         ]
//       }
//       export const initializeDataSource = async () => {
//         try {
//           const dataSource = new DataSource(dataSourceOptions);
//           await dataSource.initialize();
//           console.log("Data source initialized successfully");
//         } catch (error) {
//           console.error("Error initializing data source:", error);
//           throw error; // Re-throw the error to prevent app launch
//         }
//       };
import Database from 'better-sqlite3';

export default class DataSource {
  private static instance: DataSource;
  private db: Database;

  private constructor() {
    // console.log('./data/test.sqlite')
    // Khởi tạo kết nối đến cơ sở dữ liệu
    this.db = new Database('./data/test.sqlite');
  }

  public static getInstance(): DataSource {
    if (!DataSource.instance) {
      DataSource.instance = new DataSource();
    }
    return DataSource.instance;
  }

  public getDatabase(): Database {
    return this.db;
  }
}
