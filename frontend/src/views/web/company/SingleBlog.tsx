import { useParams } from 'react-router-dom';
import blogPosts from "../company/Blog";
import "../../../assets/styles/custom.css"
import PathComponent from '../components/PathComponent';

type BlogState = {
  id: number;
  title: string;
  author: string;
  date: string;
  imageSrc: string;
  short: string;
  content: string;
  tags: string[];
}

const BlogPage = () => {

  const { id } = useParams();

  const blogPosts: BlogState[] = [
    {
      id: 3,
      title: 'Building a RESTful API with Node.js and Express',
      author: 'Robert Johnson',
      date: 'October 25, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipsum doloem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitr sit amet, consectetur adipiscing elit...',
      tags: ['Node.js', 'Express', 'API'],
    },
    {
      id: 1,
      title: 'How to Get Started with React',
      author: 'John Doe',
      date: 'October 15, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elit...',
      tags: ['React', 'JavaScript', 'Web Development'],
    },
    {
      id: 4,
      title: 'Creating a Responsive Web Design with CSS Grid',
      author: 'Alice Brown',
      date: 'October 30, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipsum em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit...',
      tags: ['CSS', 'Web Design', 'Frontend'],
    },

    {
      id: 6,
      title: 'Getting Started with GraphQL',
      author: 'Maria Garcia',
      date: 'November 10, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://plus.unsplash.com/premium_photo-1682145730713-34bba6d3d14a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipsum dolor em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitsit amet, consectetur adipiscing elit...',
      tags: ['GraphQL', 'API', 'Web Development'],
    },
    {
      id: 10,
      title: 'Building Real-Time Chat Applications with WebSocket',
      author: 'Linda Wilson',
      date: 'November 30, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipsum dolor sem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitit amet, consectetur adipiscing elit..em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['WebSocket', 'Real-Time', 'Web Development'],
    },
    {
      id: 2,
      title: '10 Tips for Writing Clean Code in JavaScript',
      author: 'Jane Smith',
      date: 'October 20, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipem ipsum dolor sit amet, consectetur adipiscing elitsum dolor sit amet, consectetur adipiscing elit...',
      tags: ['JavaScript', 'Programming', 'Coding'],
    },
    {
      id: 7,
      title: 'A Deep Dive into Redux for State Management',
      author: 'Alex Miller',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      date: 'November 15, 2023',
      imageSrc: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
      content: 'Lorem ipsum doloem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitr sit amet, consectetur adipiscing elit...',
      tags: ['React', 'Redux', 'State Management'],
    },
    {
      id: 5,
      title: 'Introduction to Python Programming',
      author: 'David Wilson',
      date: 'November 5, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'TypeScript allows you to explicitly define types for your variables and function parameters. However, it also features a powerful type inference system that can automatically deduce types based on your code. This feature not only reduces the need for excessive type annotations but also ensures type safety without compromising code readability.',
      tags: ['Python', 'Programming', 'Scripting'],
    },

    {
      id: 9,
      title: 'Advanced TypeScript Features for Better Code',
      short: "TypeScript, with its static typing, has transformed the way we write JavaScript, making our code safer and more maintainable. While TypeScript offers robust type checking there are advanced features that can elevate your coding skills and help you write cleaner and more efficient code. In this blog post, we'll explore these advanced TypeScript features that can take your development game to the next level.Union types allow you to work with values that can be of multiple types, giving you flexibility in your code. Intersection types, on the other hand, combine multiple types into one, enabling you to create complex data structures with ease.Generics enable you to write reusable and type-safe functions and classes. They allow you to parameterize types, making your code more flexible and adaptable to various data structures.TypeScript provides powerful type inference capabilities, especially when using type guards. You can narrow down types within conditional statements, ensuring that your code is both concise and type-safe.Mapped types allow you to transform existing types into new ones. They are particularly useful for creating utility functions that manipulate the shape of objects.TypeScript's module system allows you to organize your code into manageable pieces. It supports modern module syntax, including ES6 modules, and provides a seamless way to import and export functionality, making your codebase more maintainable and scalable.",
      author: 'Samuel Green',
      date: 'November 25, 2023',
      imageSrc: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipsum dolor sit amet, consectetem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitur adipiscing elit...',
      tags: ['TypeScript', 'Programming', 'Type Safety'],

    },
    {
      id: 8,
      title: 'Docker and Containerization Explained',
      author: 'Ella White',
      date: 'November 20, 2023',
      short: "TypeScript has rapidly gained popularity in the world of web development thanks to its ability to improve code quality, catch errors at compile time, and enable more robust applications. However, many developers only scratch the surface of what TypeScript can do. In this blog post, we'll delve into advanced TypeScript features that can take your coding skills to the next level and help you write cleaner, safer, and more efficient code.",
      imageSrc: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      content: 'Lorem ipsum dolor em ipsum dolor sit amet, consectetur adipiscing elitem ipsum dolor sit amet, consectetur adipiscing elitsit amet, consectetur adipiscing elit...',
      tags: ['Docker', 'Containerization', 'DevOps'],
    },

  ];
  const parsedId = parseInt(id || '');
  if (!isNaN(parsedId)) {

    const blogPost = blogPosts.find(post => post.id === parsedId);

    if (blogPost) {

      return (

        <div className="blog-post">
          <div className='path-ml'>
            <PathComponent title={blogPost.title} link='/blog' />
          </div>
          <div className="content-container">
            <span>{blogPost.date}</span>
            <p>{blogPost.short}</p>

          </div>
          <div className="image-container">
            <img src={blogPost.imageSrc} alt={blogPost.title} />
          </div>

          <div className="title-container">
            <h2>{blogPost.title}</h2>
          </div>
          <div className="content-container">
            <p>{blogPost.content}</p>
            <span>{blogPost.date}</span>
          </div>
        </div>
      );
    } else {

      return <div>Blog not found</div>;
    }
  } else {

    return <div>Invalid blog ID</div>;
  }
}
export default BlogPage;