// Team data for About page
import razaImg from '../../assets/autherImg/raza.jpg';
import majid from '../../assets/majid.jpg';
const teamMembers = [
  {
    name: 'Raza Abbas',
    role: 'Frontend Developer',
    img: razaImg,
    bio: 'Specializes in building responsive and high-performance interfaces using modern frontend frameworks.',
    skills: ['React', 'TypeScript', 'GraphQL'],
    social: {
      twitter: '#',
      github: '#',
      codepen: '#'
    }
  },
  {
    name: 'Abdul majid',
    role: 'UI/UX Designer',
    img: majid,
    bio: 'Designs visually appealing and intuitive user experiences through research-driven workflows.',
    skills: ['Figma', 'Adobe XD', 'User Research'],
    social: {
      dribbble: '#',
      behance: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Siraj Ansari',
    role: 'Backend Developer',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Builds secure and scalable backend systems using modern technologies and cloud services.',
    skills: ['Node.js', 'Express', 'MongoDB'],
    social: {
      github: '#',
      linkedin: '#',
      twitter: '#'
    }
  }
];

export default teamMembers;
