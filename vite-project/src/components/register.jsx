import React, { useState, useEffect } from 'react';
import {
    Button, Form, Card, CardBody,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const initialValues = {
    email: '',
    password: '',
    terms: false
};

const errorMessages = {
    email: 'Geçerli bir e-mail giriniz',
    password: 'Şifre en az 8 karakter olmalı, büyük/küçük harf ve rakam içermelidir.'
};

export default function Register() {
    const history = useHistory();
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        
        const isFormValid = 
            emailRegex.test(formData.email) && 
            passwordRegex.test(formData.password) && 
            formData.terms === true;

        setIsValid(isFormValid);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        const finalValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: finalValue
        });

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrors(prev => ({
                ...prev,
                email: emailRegex.test(value) || value === '' ? '' : errorMessages.email
            }));
        } else if (name === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            setErrors(prev => ({
                ...prev,
                password: passwordRegex.test(value) || value === '' ? '' : errorMessages.password
            }));
        }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isValid) {
        console.log('Giriş Başarılı, yönlendiriliyor...');
        history.push('/success');
    } else {
        console.log('Giriş Başarısız!');
    }
};

    return (
        <Card className="m-4">
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">E-mail</Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="email@ornek.com"
                            type="email"
                            onChange={handleChange}
                            value={formData.email}
                            invalid={!!errors.email}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Şifre</Label>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="Şifreniz"
                            type="password"
                            onChange={handleChange}
                            value={formData.password}
                            invalid={!!errors.password}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                    </FormGroup>

                    <FormGroup check className="mb-3">
                        <Input 
                            id="terms"
                            name="terms" 
                            type="checkbox" 
                            onChange={handleChange} 
                            checked={formData.terms} 
                        />
                        <Label for="terms" check>
                            Şartları kabul ediyorum
                        </Label>
                    </FormGroup>

                    <Button color="primary" disabled={!isValid} block>
                        Login
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
}