import {Box, Flex, Text} from '@radix-ui/themes'
import {NavLink} from "react-router-dom";
import {LINKS} from "../../App.tsx";


export const Sidebar = () => {
    return (
        <Flex direction="column" gap="1">
            {LINKS.map(({to, label}) => (
                    <NavLink key={to} to={to}>
                        {({isActive}) => (
                            <Box
                                px="3" py="2"
                                className={`rounded-md cursor-pointer ${isActive ? 'bg-gray-100' : 'bg-transparent'}`}
                            >
                                <Text size="2" weight={isActive ? 'bold' : 'regular'} color={isActive ? 'indigo' : 'gray'}>
                                    {label}
                                </Text>
                            </Box>
                        )}
                    </NavLink>
                )
            )}
        </Flex>
    )
}