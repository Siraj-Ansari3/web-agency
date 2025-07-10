import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiPlus, HiPencil, HiTrash, HiEye } from 'react-icons/hi';
import {Toaster, toast} from 'react-hot-toast';
const DashboardPortfolio = () => {

    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_DOMAIN}/project`,
                    { withCredentials: true }
                );
                setProjects(response.data.projects);
            } catch (err) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const deleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_DOMAIN}/project/${id}`,
                { withCredentials: true }
            );
            setTimeout(() => {
                setProjects(projects.filter(project => project._id !== id));
                toast.success("Project deleted successfully");
            }, 600);
        } catch (err) {
            alert('Failed to delete project');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    //   if (error) {
    //     return <div className="text-red-500 p-4">{error}</div>;
    //   }

    return (
        <div className="max-w-7xl mx-auto">
            <Toaster />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Portfolio Projects</h1>
                <Link
                    to="/admin/dashboard/add-portfolio"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    <HiPlus className="text-lg" />
                    Add Project
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((project) => (
                            <tr key={project._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-md object-cover"
                                                src={project.thumbnail}
                                                alt={project.title}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {project.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Published
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        to={`/portfolio/${project.project_id}`}
                                        target="_blank"
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                        title="View"
                                    >
                                        <HiEye className="inline" />
                                    </Link>
                                    <Link
                                        to={`/admin/dashboard/edit-portfolio/${project.project_id}`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        title="Edit"
                                    >
                                        <HiPencil className="inline" />
                                    </Link>
                                    <button
                                        onClick={() => deleteProject(project._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <HiTrash className="inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardPortfolio;