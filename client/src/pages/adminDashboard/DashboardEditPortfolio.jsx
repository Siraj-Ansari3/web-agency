import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardPortfolioForm from './DashboardPortfolioForm';

const DashboardEditPortfolio = () => {
  const { project_id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/project/get-project/${project_id}`,
          { withCredentials: true }
        );
        setProject(response.data.project);
      } catch (error) {
        console.error('Error fetching project:', error);
        setSaveMessage(`Failed to load project: ${error.response?.data?.error || error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [project_id]);

  const handleSave = async (formData) => {
    setIsSubmitting(true);
    setSaveMessage('Updating project...');
    
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_DOMAIN}/project/update/${project_id}`,
        formData,
        { withCredentials: true }
      );
      setSaveMessage('Project updated successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/admin/dashboard/portfolios');
      }, 1500);
    } catch (error) {
      console.error('Update failed:', error);
      setSaveMessage(`Failed to update project: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Portfolio Project</h1>
      </div>

      {saveMessage && (
        <div className={`mb-4 p-3 rounded-md ${
          saveMessage.includes('success') 
            ? 'bg-green-100 text-green-800' 
            : saveMessage.includes('Updating') 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-red-100 text-red-800'
        }`}>
          {saveMessage}
        </div>
      )}

      {project ? (
        <DashboardPortfolioForm 
          initialData={project} 
          onSave={handleSave} 
          isSubmitting={isSubmitting} 
        />
      ) : (
        <div className="text-red-500 p-4">Project not found</div>
      )}
    </div>
  );
};

export default DashboardEditPortfolio;