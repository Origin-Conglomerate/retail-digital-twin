import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout/Layout"
import Dashboard from "./RetailDigitalTwin/Dashboard/Dashboard"
import Customers from "./RetailDigitalTwin/Customers/Customers"
import SalesOrders from "./RetailDigitalTwin/SalesOrders/SalesOrders"
import Staff from "./RetailDigitalTwin/Staff/Staff"
import Finance from "./RetailDigitalTwin/Finance/Finance"
import Inventory from "./RetailDigitalTwin/Inventory/Inventory"
import Operations from "./RetailDigitalTwin/Operations/Operations"
import PhysicalTwin from "./RetailDigitalTwin/PhysicalTwin/PhysicalTwin"
import Profile from "./RetailDigitalTwin/Profile/Profile"
import AgenticAI from "./RetailDigitalTwin/AgenticAI/AgenticAI"
import LogMonitor from "./RetailDigitalTwin/LogMonitor/LogMonitor"
import AIAnalytics from "./RetailDigitalTwin/AIAnalytics/AIAnalytics"
import Marketing from "./RetailDigitalTwin/Marketing/Marketing"
import CustomerSupport from "./RetailDigitalTwin/CustomerSupport/CustomerSupport"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/agentic-ai" element={<AgenticAI />} />
            <Route path="/log-monitor" element={<LogMonitor />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/sales-orders" element={<SalesOrders />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customer-support" element={<CustomerSupport />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/physical-twin" element={<PhysicalTwin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
