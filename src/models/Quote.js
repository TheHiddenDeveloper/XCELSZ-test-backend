const db = require('../config/database');

class Quote {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS quotes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id VARCHAR(255) NOT NULL,
        service VARCHAR(255) NOT NULL,
        location_name VARCHAR(255) NOT NULL,
        project_need TEXT NOT NULL,
        project_details TEXT NOT NULL,
        project_documentation VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      await db.query(query);
      console.log('Quotes table created or already exists');
    } catch (error) {
      console.error('Error creating quotes table:', error);
      throw error;
    }
  }

  static async create(quoteData) {
    await this.createTable(); // Ensure table exists

    const query = `
      INSERT INTO quotes 
      (property_id, service, location_name, project_need, project_details, project_documentation, name, email, whatsapp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      quoteData.property_id,
      quoteData.service,
      quoteData.location_name,
      quoteData.project_need,
      quoteData.project_details,
      quoteData.project_documentation,
      quoteData.name,
      quoteData.email,
      quoteData.whatsapp
    ];

    try {
      const [result] = await db.query(query, values);
      return result;
    } catch (error) {
      console.error('Error creating quote:', error);
      throw error;
    }
  }

  static async getAll() {
    const query = 'SELECT * FROM quotes ORDER BY created_at DESC';
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error getting all quotes:', error);
      throw error;
    }
  }

  static async getById(id) {
    const query = 'SELECT * FROM quotes WHERE id = ?';
    try {
      const [rows] = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error getting quote by ID:', error);
      throw error;
    }
  }

  static async update(id, quoteData) {
    const query = `
      UPDATE quotes 
      SET property_id = ?, 
          service = ?, 
          location_name = ?, 
          project_need = ?, 
          project_details = ?, 
          project_documentation = COALESCE(?, project_documentation),
          name = ?, 
          email = ?, 
          whatsapp = ?
      WHERE id = ?
    `;

    const values = [
      quoteData.property_id,
      quoteData.service,
      quoteData.location_name,
      quoteData.project_need,
      quoteData.project_details,
      quoteData.project_documentation,
      quoteData.name,
      quoteData.email,
      quoteData.whatsapp,
      id
    ];

    try {
      const [result] = await db.query(query, values);
      return result;
    } catch (error) {
      console.error('Error updating quote:', error);
      throw error;
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM quotes WHERE id = ?';
    try {
      const [result] = await db.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Error deleting quote:', error);
      throw error;
    }
  }
}

module.exports = Quote;