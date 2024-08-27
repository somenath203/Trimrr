# Trimrr 

## Demo video of the overall project

![Screenshot (695)](https://github.com/user-attachments/assets/a2404eb2-2530-48ea-bff7-1e211c1177d3)

https://www.youtube.com/watch?v=_puDioxRQ2U

## Introduction

**Trimrr** is a URL shortening web application that allows users to easily create and manage short URLs. After signing up, users can generate short URLs from long ones, track from where their links are being 
accessed, and view detailed statistics about the devices and cities from which their links are visited. With Trimrr, user can also generate QR codes for your short links, making it easy to share them.

## Features of the Application

1. **User Authentication**:
   - Secure user authentication through Supabase.
   - Redirects users to the dashboard upon successful login.

2. **URL Shortening**:
   - Easily generate a short URL by entering the original URL, a title, and an optional custom name for the short link.
   - All generated short URLs are displayed in the user's dashboard.

3. **Dashboard Management**:
   - View all created URLs in one place.
   - View total number of URLs created.
   - Search for specific URLs by typing their title in the search box.
   - Click on a URL card to view detailed statistics.

4. **URL Statistics**:
   - View the title, original URL, and the generated short URL, which redirects to the original link.
   - See the date the short URL was created.
   - Access the generated QR code, which can be scanned to open the short link.
   - Copy the short URL, download the QR code, or delete the QR code with just a click.

5. **Graphs & Analytics**:
   - Line graph showing the total number of clicks across different cities.
   - Pie chart displaying the total number of clicks from various devices.

## Technologies Used

- **Supabase**: Used for user authentication and data storage.
- **ShadCN UI**: For the design and layout of the application.
- **Tailwind CSS**: Provides styling for the user interface.
- **Recharts**: Utilized for displaying the graphs and statistics.
- **UA-Parser-JS**: Tracks the type of devices from which the short URLs are accessed.
- **Yup**: Used for form validation to ensure data integrity.
- **React (via Vite)**: The frontend framework used to build the application.
- **IPAPI**: Used to track and display the location of clicks based on the user's IP address.

## Deployment

The project is deployed on Vercel.

Here is the deployment link: https://trimrr-som.vercel.app/
