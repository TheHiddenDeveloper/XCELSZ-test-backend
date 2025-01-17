const db = require('../config/database');

class Booking {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id VARCHAR(255) NOT NULL,
        deal_name VARCHAR(255) NOT NULL,
        service VARCHAR(255),
        viewing_slot DATETIME NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(50) NOT NULL,
        employment_status VARCHAR(100) NOT NULL,
        proof_of_funds_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      await db.query(query);
      console.log('Bookings table created or already exists');
    } catch (error) {
      console.error('Error creating bookings table:', error);
      throw error;
    }
  }

  static async create(bookingData) {
    await this.createTable(); // Ensure table exists

    const query = `
      INSERT INTO bookings 
      (property_id, deal_name, service, viewing_slot, name, email, whatsapp, employment_status, proof_of_funds_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      bookingData.property_id,
      bookingData.deal_name,
      bookingData.service,
      bookingData.viewing_slot,
      bookingData.name,
      bookingData.email,
      bookingData.whatsapp,
      bookingData.employment_status,
      bookingData.proof_of_funds_url
    ];

    try {
      const [result] = await db.query(query, values);
      return result;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  static async getAll() {
    const query = 'SELECT * FROM bookings ORDER BY created_at DESC';
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error getting all bookings:', error);
      throw error;
    }
  }

  static async getById(id) {
    const query = 'SELECT * FROM bookings WHERE id = ?';
    try {
      const [rows] = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error getting booking by ID:', error);
      throw error;
    }
  }

  static async getByName(name) {
    const query = 'SELECT * FROM bookings WHERE name LIKE ?';
    try {
      const [rows] = await db.query(query, [`%${name}%`]);
      return rows;
    } catch (error) {
      console.error('Error getting bookings by name:', error);
      throw error;
    }
  }

  static async getByWhatsapp(whatsapp) {
    const query = 'SELECT * FROM bookings WHERE whatsapp = ?';
    try {
      const [rows] = await db.query(query, [whatsapp]);
      return rows;
    } catch (error) {
      console.error('Error getting bookings by WhatsApp:', error);
      throw error;
    }
  }

  static async update(id, bookingData) {
    const query = `
      UPDATE bookings 
      SET property_id = ?, 
          deal_name = ?, 
          service = ?, 
          viewing_slot = ?, 
          name = ?, 
          email = ?, 
          whatsapp = ?, 
          employment_status = ?,
          proof_of_funds_url = COALESCE(?, proof_of_funds_url)
      WHERE id = ?
    `;

    const values = [
      bookingData.property_id,
      bookingData.deal_name,
      bookingData.service,
      bookingData.viewing_slot,
      bookingData.name,
      bookingData.email,
      bookingData.whatsapp,
      bookingData.employment_status,
      bookingData.proof_of_funds_url,
      id
    ];

    try {
      const [result] = await db.query(query, values);
      return result;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM bookings WHERE id = ?';
    try {
      const [result] = await db.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
}

module.exports = Booking;