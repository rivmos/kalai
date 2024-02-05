
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PathComponent from "../components/PathComponent"
import { useState } from "react";

const blogPosts = [
    {
        id: 3,
        title: 'Building a RESTful API with Node.js and Express',
        author: 'Robert Johnson',
        date: 'October 25, 2023',
        imageSrc:'https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum doloem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitr sit amet, consectetur adipiscing elit...',
        tags: ['Node.js', 'Express', 'API'],
    },
    {
        id: 1,
        title: 'How to Get Started with React',
        author: 'John Doe',
        date: 'October 15, 2023',
        imageSrc:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elit...',
        tags: ['React', 'JavaScript', 'Web Development'],
    },
    {
        id: 4,
        title: 'Creating a Responsive Web Design with CSS Grid',
        author: 'Alice Brown',
        date: 'October 30, 2023',
        imageSrc:'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit...',
        tags: ['CSS', 'Web Design', 'Frontend'],
    },

    {
        id: 6,
        title: 'Getting Started with GraphQL',
        author: 'Maria Garcia',
        date: 'November 10, 2023',
        imageSrc:'https://plus.unsplash.com/premium_photo-1682145730713-34bba6d3d14a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum dolor em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitsit amet, consectetur adipiscing elit...',
        tags: ['GraphQL', 'API', 'Web Development'],
    },
    {
        id: 10,
        title: 'Building Real-Time Chat Applications with WebSocket',
        author: 'Linda Wilson',
        date: 'November 30, 2023',
        imageSrc:'https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum dolor sem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitit amet, consectetur adipiscing elit..em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elit.',
        tags: ['WebSocket', 'Real-Time', 'Web Development'],
    },
    {
        id: 2,
        title: '10 Tips for Writing Clean Code in JavaScript',
        author: 'Jane Smith',
        date: 'October 20, 2023',
        imageSrc:'https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipem ipsum dolor sit amet, consectetur adipiscing elitsum dolor sit amet, consectetur adipiscing elit...',
        tags: ['JavaScript', 'Programming', 'Coding'],
    },
    {
        id: 7,
        title: 'A Deep Dive into Redux for State Management',  
        author: 'Alex Miller', 
        date: 'November 15, 2023',        
        imageSrc:'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
        content: 'Lorem ipsum doloem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitr sit amet, consectetur adipiscing elit...',
        tags: ['React', 'Redux', 'State Management'],
    },
    {
        id: 5,
        title: 'Introduction to Python Programming',
        author: 'David Wilson',
        date: 'November 5, 2023',
        imageSrc:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum dem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitolor sit amet, consectetur adipiscing elit...',
        tags: ['Python', 'Programming', 'Scripting'],
    },

    {
        id: 9,
        title: 'Advanced TypeScript Features for Better Code',
        author: 'Samuel Green',
        date: 'November 25, 2023',
        imageSrc:'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum dolor sit amet, consectetem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitur adipiscing elit...',
        tags: ['TypeScript', 'Programming', 'Type Safety'],

    },
    {
        id: 8,
        title: 'Docker and Containerization Explained',
        author: 'Ella White',
        date: 'November 20, 2023',
        imageSrc:'https://images.unsplash.com/photo-1554306274-f23873d9a26c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'Lorem ipsum dolor em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitsit amet, consectetur adipiscing elit...',
        tags: ['Docker', 'Containerization', 'DevOps'],
    },

];

const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
});

const Blog = () => {
   

   
    const firstBlog = sortedBlogPosts[0]
    const restBlogs = sortedBlogPosts.slice(1, (sortedBlogPosts.length))

    const renderedBlogList = restBlogs.map(blog => {
        const readingTime = Math.ceil(blog.content.split(' ').length / 100)
        return (
            <div key={blog.id} className="col-md-4">
            <Link to={`/web/company/singleblog/${blog.id}`} style={{ textDecoration: 'none' }} >
                <div className="inner-list-sec">
                    <div className="blg-img">
                        <img src={blog.imageSrc} className="blog-list-img" />
                    </div>
                    <div className="blod-detail">
                        <div>
                            <span>{blog.tags.slice(0, 1).map(tag => <span>{tag}</span>)}</span>•
                            <span>{readingTime} Minute Read</span>
                        </div>
                        <h4>{blog.title}</h4>
                        <p>{blog.content.slice(0, 100)}...</p>
                        <div>
                            <span>{blog.author}</span> by <span>{blog.date}</span>
                        </div>
                    </div>
                </div> 
            </Link>
        </div>
        )
    })
                                
    return (
        <div>
            <PathComponent title="Blog" />
            <div className="main-blog-list-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="first-blog">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2>{firstBlog.title}</h2>
                                        <p>{firstBlog.content.slice(0,100)}...</p>
                                        <span>{firstBlog.date}</span>
                                        <button className="btn-txt">Read Full Story</button>
                                    </div>
                                    <div className="col-md-6">
                                        <img src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={firstBlog.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blog-list-sec">
                        <div className="row">
                            {renderedBlogList}
                        </div>
                    </div>
                </div>
            </div>
        </div>            
    )
}

export default Blog 