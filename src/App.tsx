import {Navigate, Route, Routes} from 'react-router-dom'
import {Box, Flex, Heading} from '@radix-ui/themes'
import {UsersPage} from "./pages/UsersPage.tsx";
import {Sidebar} from "./components/sidebar/Sidebar.tsx";
import {ReviewersPage} from "./pages/ReviewersPage.tsx";
import {BothPage} from "./pages/BothPage.tsx";

export const LINKS = [
    {to: '/users-and-reviewers', label: 'User & Reviewers'},
    {to: '/users', label: 'Users'},
    {to: '/reviewers', label: 'Reviewers'},
];

function App() {
    return (
        <Flex style={{minHeight: '100vh'}}>
            <Box p="5" className="w-[220px] flex-shrink-0 border-r border-gray-4 bg-gray-1">
                <Heading size="4" mb="6">Fechallenge</Heading>
                <Sidebar/>
            </Box>

            <Box flexGrow="1" p="6" className="overflow-hidden">
                <Routes>
                    <Route path="/" element={<Navigate to={LINKS[0].to} replace/>}/>
                    <Route path={LINKS[0].to} element={<BothPage/>}/>
                    <Route path={LINKS[1].to} element={<UsersPage/>}/>
                    <Route path={LINKS[2].to} element={<ReviewersPage/>}/>
                </Routes>
            </Box>
        </Flex>
    )
}

export default App
