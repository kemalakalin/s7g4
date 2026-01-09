import React from 'react';
import { Card, CardBody, Alert } from 'reactstrap';

export default function Success() {
    return (
        <Card className="m-5">
            <CardBody>
                <Alert color="success">
                    <h4 className="alert-heading">Başarılı!</h4>
                    <p>Giriş işleminiz başarıyla tamamlandı. Hoş geldiniz!</p>
                </Alert>
            </CardBody>
        </Card>
    );
}