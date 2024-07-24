import React, { useEffect, useState } from 'react';
import { Table, Group, Button, MantineProvider, createTheme, Modal, TextInput, FileInput, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import userRole from '../../pages/AuthenticationTitle/AuthenticationTitle'
import axios from 'axios';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: {
      classNames: classes,
    },
  },
});

export function ReportsTable() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedReport, setUpdatedReport] = useState({});
  const [file, setFile] = useState(null);
  const [diagnosisDate, setDiagnosisDate] = useState(null);
  const [laborants, setLaborants] = useState([]);
  const [userRole, setUserRole] = useState<string | null>(null);




  const handleLaborantChange = async (value) => {
    setUpdatedReport((prev) => ({ ...prev, laborantId: value }));
    
    // Fetch laborant details and update the updatedReport
    if (value) {
      const laborantDetails = await fetchLaborantDetails(value);
      if (laborantDetails) {
        setUpdatedReport((prev) => ({
          ...prev,
          laborant: laborantDetails,
        }));
      }
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/reports");
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const fetchLaborants = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/laborants');
      setLaborants(data.map(laborant => ({
        value: laborant.id.toString(), // Convert ID to string
        label: `${laborant.firstName} ${laborant.lastName}`
      })));
    } catch (error) {
      console.error('Error fetching laborants:', error);
    }
  };

  const fetchLaborantDetails = async (laborantId) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/laborants/${laborantId}`);
      return data;
    } catch (error) {
      console.error('Error fetching laborant details:', error);
      return null;
    }
  };


  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    fetchData();
    fetchLaborants();
    console.log(userRole);
  }, []);
  const handleView = (report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const handleEdit = (report) => {
    setSelectedReport(report);
    setUpdatedReport({ ...report });
    setDiagnosisDate(new Date(report.diagnosisDate));
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      let newFilePath = updatedReport.reportImagePath;
  
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file.name);
        const response = await axios.post(`http://localhost:8080/reports/${selectedReport.id}/upload`, formData);
  
       
        newFilePath = `/uploads/${updatedReport.id}_${file.name}`; 
        selectedReport.reportImagePath=newFilePath
        console.log(selectedReport.reportImagePath);    
      }
  
     
      updatedReport.reportImagePath = newFilePath;
      updatedReport.diagnosisDate = diagnosisDate.toISOString().split('T')[0]; // Tarihi ISO string'e dönüştür
  
      await axios.put(`http://localhost:8080/reports/${updatedReport.id}`, updatedReport);
      fetchData();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`http://localhost:8080/reports/${reportId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReport((prev) => ({ ...prev, [name]: value }));
  };

  const rows = reports.map((report) => (
    <Table.Tr key={report.id}>
      <Table.Td>{report.patientFirstName}</Table.Td>
      <Table.Td>{report.patientLastName}</Table.Td>
      <Table.Td>{report.patientId}</Table.Td>
      <Table.Td>{report.laborant.firstName}</Table.Td>
      <Table.Td>{report.laborant.lastName}</Table.Td>
      <Table.Td>
        <Group>
          <Button size="xs" onClick={() => handleView(report)} variant="secondary">View</Button>
          <Button size="xs" onClick={() => handleEdit(report)} variant="primary">Edit</Button>
          {userRole === 'admin' && (
            <Button size="xs" onClick={() => handleDelete(report.id)} variant="danger">Delete</Button>
          )} 

        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <MantineProvider theme={theme}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Patient Name</Table.Th>
            <Table.Th>Patient Surname</Table.Th>
            <Table.Th>Patient ID</Table.Th>
            <Table.Th>Laborant Name</Table.Th>
            <Table.Th>Laborant Surname</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* View Report Modal */}
      <Modal
        opened={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View Report"
      >
        {selectedReport && (
          <>
            <TextInput
              label="File Number"
              value={selectedReport.fileNumber}
              readOnly
            />
            <TextInput
              label="Patient First Name"
              value={selectedReport.patientFirstName}
              readOnly
            />
            <TextInput
              label="Patient Last Name"
              value={selectedReport.patientLastName}
              readOnly
            />
            <TextInput
              label="Patient ID"
              value={selectedReport.patientId}
              readOnly
            />
            <TextInput
              label="Diagnosis Title"
              value={selectedReport.diagnosisTitle}
              readOnly
            />
            <TextInput
              label="Diagnosis Details"
              value={selectedReport.diagnosisDetails}
              readOnly
            />
            <TextInput
              label="Laborant Name Surname"
              value={`${selectedReport.laborant.firstName} ${selectedReport.laborant.lastName}`}
              readOnly
            />
            <h3>Report Image</h3>
            <img
              src={`http://localhost:8080${selectedReport.reportImagePath}`}
              alt="Report"
              style={{ width: '100%', height: 'auto', marginTop: '20px' }}
            />
            <TextInput
              label="Diagnosis Date"
              value={new Date(selectedReport.diagnosisDate).toLocaleDateString('en-GB')}
              readOnly
            />
          </>
        )}
      </Modal>

      {/* Edit Report Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Report"
      >
        {selectedReport && (
          <>
            <TextInput
              label="File Number"
              name="fileNumber"
              value={updatedReport.fileNumber || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Patient First Name"
              name="patientFirstName"
              value={updatedReport.patientFirstName || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Patient Last Name"
              name="patientLastName"
              value={updatedReport.patientLastName || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Patient ID"
              name="patientId"
              value={updatedReport.patientId || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Diagnosis Title"
              name="diagnosisTitle"
              value={updatedReport.diagnosisTitle || ''}
              onChange={handleInputChange}
            />
            <TextInput
              label="Diagnosis Details"
              name="diagnosisDetails"
              value={updatedReport.diagnosisDetails || ''}
              onChange={handleInputChange}
            />
            <Select
              label="Laborant"
              name="laborantId"
              value={updatedReport.laborantId?.toString() || ''}
              onChange={handleLaborantChange}
              data={laborants}
            />
            <FileInput
              label="Upload New Image"
              onChange={(e) => setFile(e)}
            />
            <Button onClick={handleUpdate} variant="primary">Update</Button>
          </>
        )}
      </Modal>
    </MantineProvider>
  );
}

export default ReportsTable;
