# 🌐 **BlogNest**  
> _Your ultimate platform for sharing ideas, thoughts, and stories._

---

## 🚀 Introduction  
**BlogNest** is a feature-rich blogging platform designed to offer an intuitive and engaging experience for both content creators and readers. With powerful blog management tools and a sleek UI, BlogNest simplifies content creation while ensuring seamless interaction.

---

## ✨ Features  
✅ **User Authentication** – Secure and efficient login/registration.  
✅ **Blog Management** – Create, edit, and delete your blogs.  
✅ **Categories Support** – Organize content with relevant categories.  
✅ **Comments System** – Engage with readers through comments.  
✅ **Rich Text Editor** – Write blogs with advanced formatting.  
✅ **Responsive UI** – Optimized for all devices with a clean design.  

---

## 🛠️ Tech Stack  
### Frontend  
🟦 **React** (with Vite)  
🎨 **Tailwind CSS** for styling  
🧭 **React Router** for navigation  
🔗 **Axios** for API requests  

### Backend  
☕ **Spring Boot** for backend logic  
🐘 **MySQL** as the database  
📄 **JPA (Java Persistence API)** for data handling  

---

## 📦 Installation Guide  

### Backend Setup  
1. **Clone the backend repository:**  
   ```bash
   git clone https://github.com/anmolpurohit777/BlogNest.git
   cd BlogNest
   ```

2. **Configure MySQL Database:**  
   Update the `application.properties` file with your database details:  
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run the Application:**  
   ```bash
   ./mvnw spring-boot:run
   ```

---

### Frontend Setup  
1. **Clone the frontend repository:**  
   ```bash
   git clone https://github.com/Pratik24816/blogui.git
   cd blogui
   ```

2. **Install Dependencies:**  
   ```bash
   npm install
   ```

3. **Start the Development Server:**  
   ```bash
   npm run dev
   ```

---

## 📋 Usage  
1. 🔐 **Register/Login** – Create an account or log in securely.  
2. 📝 **Create a Blog** – Draft your content using the rich text editor.  
3. 📚 **Browse Content** – Explore engaging blogs categorized neatly.  
4. 💬 **Add Comments** – Share your thoughts with fellow readers.  