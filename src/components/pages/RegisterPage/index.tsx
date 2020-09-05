import React, { FC } from 'react';
import BaseLayout from 'components/templates/BaseLayout';
import RegisterButton from 'components/templates/RegisterButton';

interface Props {
}

const RegisterPage: FC<Props> = () => {
    return (
        <BaseLayout>
            <RegisterButton />
        </BaseLayout>
    );
}

export default RegisterPage;