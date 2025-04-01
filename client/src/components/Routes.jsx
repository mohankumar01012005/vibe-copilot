import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Audit from './Audit';
import ScheduleAudit from './ScheduleAudit';
import Edit from './VendorEdit';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Audit />} />
            <Route path='/schedule-audit' element={<ScheduleAudit />} />
            <Route path='/edit' element={<Edit />} />
        </Routes>
    );
};

export default AppRoutes;
