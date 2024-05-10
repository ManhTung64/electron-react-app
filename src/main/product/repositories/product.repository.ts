import Database from 'better-sqlite3';
import { CreateNewProductReqDto } from '../../../preload/product/dtos/productReq.dto';

export default class ProductRepository {
  private db: Database;
  private tableName: string = 'products'

  constructor(db: Database) {
    this.db = db;
  }

  public async getProducts() {
    const query = this.db.prepare('SELECT * FROM ' + this.tableName);
    return await query.all();
  }
  public async addNew(products: []) {
    try {
      const insertStatement = this.db.prepare(`
      INSERT INTO ${this.tableName} (itemId, name, itemUrl, priceShow, ratingScore, review, discount, sellerName)
      VALUES (?, ?, ?, ?, ?, ?, ? , ?)
    `);
      const transaction = this.db.transation()
      try {
        products.map(async (data: any) => {
          await insertStatement.bind([data.itemId, data.name, data.priceShow, data.ratingScore, data.review, data.discount, data.sellerName]);
        })
      } catch (er) {
        console.log(er)
      }
      try {
        transaction.commit();
        console.log('All rows inserted successfully.');
      } catch (error) {
        transaction.rollback();
        console.error('Failed to insert all rows. Rolling back transaction.');
      }
      return await insertStatement.run();
    }
    catch (error) {
      console.log(error)
      return null
    }
  }
  public async update(product: any) {
    try {
      const updateStatement = this.db.prepare(`UPDATE ${this.tableName} set name = ?, description = ?, price = ? where id = ?`)
      updateStatement.bind([product.name, product.description, product.price, product.id])
      return await updateStatement.run()
    } catch (error) {
      console.log(error)
      return null
    }
  }
  public async delete(id: number) {
    try {
      const deleteStatement = this.db.prepare(`DELETE FROM products WHERE id = ?`);
      deleteStatement.bind([id]);
      return await deleteStatement.run();
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
