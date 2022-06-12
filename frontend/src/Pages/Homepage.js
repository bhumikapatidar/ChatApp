import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import { useHistory } from 'react-router-dom'

const Homepage = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) history.push("/chats");
    }, [history]);

    return (
        <Container maxW='xl' centerContent>
            <Box
                textAlign='center'
                width='100%'
                margin='40px 0  15px 0'
                bg='#FFFFFF'
                p={4}
                borderRadius='lg'
                boxShadow='0 0 5px rgba(0,0,0,0.5)'

            >
                <Text fontSize='3xl' fontFamily='work sans' color='black' fontWeight='extrabold'>CHAT APP</Text>
            </Box>
            <Box
                textAlign='center'
                width='100%'
                margin='40px 0  15px 0'
                bg='#FFFFFF'
                p={4}
                borderRadius='lg'
                boxShadow='0 0 5px rgba(0,0,0,0.5)'

            >
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList fontFamily='work sans' color='black' mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>

        </Container>
    )
}

export default Homepage