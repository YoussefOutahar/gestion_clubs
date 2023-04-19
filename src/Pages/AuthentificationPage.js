import { SplitLeft, SplitRight, Center } from "../Utils/StyledElements";
import { Input, Button, Tooltip,Divider} from "antd";
import {
    InfoCircleOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    UserOutlined,
    LockOutlined,
} from "@ant-design/icons";
import React from "react";
import { useEffect, useState } from 'react';
import supabase from "../DataBase/SupabaseClient";
import {Routes, Route, useNavigate} from 'react-router-dom';

function AuthentificationPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            //get email and password from Etudiants table
            const { data, error } = await supabase
                .from('Etudiants')
                .select('email, password')
                .eq('email', email)
                
            if (error) throw error
            if (data) {
                if (data[0].password === password) {
                    navigate('/landingPage')
                }
                else {
                    alert("Mot de passe incorrect");
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <SplitLeft>
                <h1>Authentification Page</h1>
                <Center>
                        <Input
                            placeholder="Enter your username"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                                </Tooltip>
                            }
                        />
                        <Divider />
                        <Input.Password
                            placeholder="input password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            prefix={<LockOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                        <Divider />
                        <Button type="primary" onClick={handleLogin}>
                            Sign in
                        </Button>
                </Center>
            </SplitLeft>
            <SplitRight>
                <Center>
                    <img
                        src="https://www.uir.ac.ma/upload/cbuilder/c076f4b3518ce8be7f84bb05ec8ce0b2cc0f366f.png"
                        alt="LogoBDE"
                        style={{
                            width: "90%",
                            height: "90%",
                        }}
                    />
                </Center>
            </SplitRight>
        </div>
    );
}

export default AuthentificationPage;
