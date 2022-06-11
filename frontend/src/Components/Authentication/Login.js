import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router";
import axios from "axios";

const Login = () => {

    const toast = useToast();
    const history = useHistory();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [show, setShow] = useState(false)

    const submitHandler = async () => {
        //setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            //setLoading(false);
            return;
        }

        // console.log(email, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            // console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            //setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            //setLoading(false);
        }
    };

    return (
        <VStack>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    mb={3}
                    placeholder="Enter Email Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        mb={3}
                        type={show ? 'text' : 'password'}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5em">
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button w='100%' style={{ marginTop: '25px' }} onClick={submitHandler} colorScheme='blue'>Login</Button>
            <Button w='100%' style={{ marginTop: '25px' }}
                onClick={() => {
                    setEmail('guest@exaple.com')
                    setPassword('123456')
                }} colorScheme='red'>Guest User Credentials</Button>

        </VStack>
    )
}

export default Login