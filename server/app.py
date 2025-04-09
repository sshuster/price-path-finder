
from flask import Flask, request, jsonify
import sqlite3
import os
import secrets
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database setup
DB_PATH = "database.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )
    ''')
    
    # Products table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        store_id INTEGER NOT NULL,
        location TEXT NOT NULL,
        aisle TEXT NOT NULL,
        shelf TEXT NOT NULL
    )
    ''')
    
    # Stores table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS stores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        type TEXT NOT NULL,
        image TEXT
    )
    ''')
    
    # Shopping Lists table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS shopping_lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Shopping List Items table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS shopping_list_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        list_id INTEGER NOT NULL,
        product_id INTEGER,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        quantity INTEGER DEFAULT 1,
        purchased BOOLEAN DEFAULT 0,
        FOREIGN KEY (list_id) REFERENCES shopping_lists (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    )
    ''')
    
    # Insert mock users if they don't exist
    cursor.execute("SELECT * FROM users WHERE username = 'muser'")
    if not cursor.fetchone():
        cursor.execute('''
        INSERT INTO users (username, password, email, first_name, last_name, role)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', ('muser', generate_password_hash('muser'), 'mockuser@example.com', 'Mock', 'User', 'user'))
    
    cursor.execute("SELECT * FROM users WHERE username = 'mvc'")
    if not cursor.fetchone():
        cursor.execute('''
        INSERT INTO users (username, password, email, first_name, last_name, role)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', ('mvc', generate_password_hash('mvc'), 'mockadmin@example.com', 'Mock', 'Admin', 'admin'))
    
    conn.commit()
    conn.close()

# Initialize database when the app starts
init_db()

# API Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['username', 'password', 'email', 'firstName', 'lastName']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # Check if username already exists
        cursor.execute("SELECT * FROM users WHERE username = ?", (data['username'],))
        if cursor.fetchone():
            return jsonify({'error': 'Username already exists'}), 409
        
        # Check if email already exists
        cursor.execute("SELECT * FROM users WHERE email = ?", (data['email'],))
        if cursor.fetchone():
            return jsonify({'error': 'Email already exists'}), 409
        
        hashed_password = generate_password_hash(data['password'])
        
        cursor.execute(
            "INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
            (data['username'], hashed_password, data['email'], data['firstName'], data['lastName'])
        )
        
        user_id = cursor.lastrowid
        conn.commit()
        
        return jsonify({
            'id': user_id,
            'username': data['username'],
            'email': data['email'],
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'role': 'user'
        }), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['username', 'password']):
        return jsonify({'error': 'Missing username or password'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # This enables column access by name
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM users WHERE username = ?", (data['username'],))
        user = cursor.fetchone()
        
        if user and check_password_hash(user['password'], data['password']):
            return jsonify({
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'firstName': user['first_name'],
                'lastName': user['last_name'],
                'role': user['role']
            }), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT id, username, email, first_name, last_name, role FROM users")
        users = [dict(row) for row in cursor.fetchall()]
        return jsonify(users), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'User not found'}), 404
            
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# Product routes
@app.route('/api/products', methods=['GET'])
def get_products():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            SELECT p.id, p.name, p.category, p.price, p.store_id, p.location, p.aisle, p.shelf, s.name as store_name
            FROM products p
            JOIN stores s ON p.store_id = s.id
        """)
        products = [dict(row) for row in cursor.fetchall()]
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['name', 'category', 'price', 'storeId', 'location', 'aisle', 'shelf']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO products (name, category, price, store_id, location, aisle, shelf) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (data['name'], data['category'], data['price'], data['storeId'], data['location'], data['aisle'], data['shelf'])
        )
        
        product_id = cursor.lastrowid
        conn.commit()
        
        return jsonify({
            'id': product_id,
            'name': data['name'],
            'category': data['category'],
            'price': data['price'],
            'storeId': data['storeId'],
            'location': data['location'],
            'aisle': data['aisle'],
            'shelf': data['shelf']
        }), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Product not found'}), 404
            
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# Shopping list routes
@app.route('/api/shopping-lists', methods=['GET'])
def get_shopping_lists():
    user_id = request.args.get('userId')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            SELECT id, user_id, name, created_at
            FROM shopping_lists
            WHERE user_id = ?
        """, (user_id,))
        
        lists = []
        for row in cursor.fetchall():
            list_data = dict(row)
            list_id = list_data['id']
            
            # Get items for this list
            cursor.execute("""
                SELECT id, product_id, name, category, quantity, purchased
                FROM shopping_list_items
                WHERE list_id = ?
            """, (list_id,))
            
            items = [dict(item_row) for item_row in cursor.fetchall()]
            list_data['items'] = items
            lists.append(list_data)
            
        return jsonify(lists), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/shopping-lists', methods=['POST'])
def create_shopping_list():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['userId', 'name']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO shopping_lists (user_id, name) VALUES (?, ?)",
            (data['userId'], data['name'])
        )
        
        list_id = cursor.lastrowid
        conn.commit()
        
        # Insert items if provided
        if 'items' in data and data['items']:
            for item in data['items']:
                cursor.execute(
                    "INSERT INTO shopping_list_items (list_id, product_id, name, category, quantity) VALUES (?, ?, ?, ?, ?)",
                    (list_id, item.get('productId'), item['name'], item['category'], item.get('quantity', 1))
                )
            
            conn.commit()
        
        return jsonify({
            'id': list_id,
            'userId': data['userId'],
            'name': data['name'],
            'items': data.get('items', []),
            'createdAt': None  # The database will set this
        }), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/shopping-lists/<int:list_id>/items', methods=['POST'])
def add_list_item(list_id):
    data = request.get_json()
    
    if not data or not all(key in data for key in ['name', 'category']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # Check if list exists
        cursor.execute("SELECT id FROM shopping_lists WHERE id = ?", (list_id,))
        if not cursor.fetchone():
            return jsonify({'error': 'Shopping list not found'}), 404
        
        cursor.execute(
            "INSERT INTO shopping_list_items (list_id, product_id, name, category, quantity) VALUES (?, ?, ?, ?, ?)",
            (list_id, data.get('productId'), data['name'], data['category'], data.get('quantity', 1))
        )
        
        item_id = cursor.lastrowid
        conn.commit()
        
        return jsonify({
            'id': item_id,
            'listId': list_id,
            'productId': data.get('productId'),
            'name': data['name'],
            'category': data['category'],
            'quantity': data.get('quantity', 1),
            'purchased': False
        }), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/shopping-lists/<int:list_id>/items/<int:item_id>', methods=['PUT'])
def update_list_item(list_id, item_id):
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # Check if item exists in the specified list
        cursor.execute("SELECT id FROM shopping_list_items WHERE id = ? AND list_id = ?", (item_id, list_id))
        if not cursor.fetchone():
            return jsonify({'error': 'Item not found in the specified list'}), 404
        
        # Update only the provided fields
        updates = []
        values = []
        
        if 'quantity' in data:
            updates.append("quantity = ?")
            values.append(data['quantity'])
        
        if 'purchased' in data:
            updates.append("purchased = ?")
            values.append(1 if data['purchased'] else 0)
        
        if not updates:
            return jsonify({'error': 'No fields to update'}), 400
        
        values.append(item_id)
        values.append(list_id)
        
        cursor.execute(
            f"UPDATE shopping_list_items SET {', '.join(updates)} WHERE id = ? AND list_id = ?",
            tuple(values)
        )
        
        conn.commit()
        
        # Get the updated item
        cursor.execute(
            "SELECT id, list_id, product_id, name, category, quantity, purchased FROM shopping_list_items WHERE id = ?", 
            (item_id,)
        )
        
        item = cursor.fetchone()
        if item:
            return jsonify({
                'id': item[0],
                'listId': item[1],
                'productId': item[2],
                'name': item[3],
                'category': item[4],
                'quantity': item[5],
                'purchased': bool(item[6])
            }), 200
        else:
            return jsonify({'error': 'Item not found after update'}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
