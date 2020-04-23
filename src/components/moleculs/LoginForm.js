import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import MainInput from 'components/atoms/MainInput';
import MainButton from 'components/atoms/MainButton';
import { AuthContext } from 'context/AuthContext';
import { auth } from 'services/firebase';
import { routes } from 'routes';

const StyledBtn = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const LoginForm = ({ isRegister }) => {
  const { handleSubmit, register, errors } = useForm();
  const { setAuthorization } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = (values) => {
    if (!isRegister) {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((data) => {
          setAuthorization({ isAuthorized: true });
          history.push(routes.pantry);
        })

        .catch((error) => {
          alert(error);
        });
    }
    if (isRegister) {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        // .then((data) => {
        //   console.log('uid', data.user.uid);
        //   return db.collection('users').doc(data.user.uid).set({
        //     pantry: [],
        //     shoppingList: [],
        //     selectedProducts: [],
        //   });
        // })
        .then((data) => {
          setAuthorization({ isAuthorized: true });
          history.push(routes.pantry);
        })

        .catch((error) => alert(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input
        title="Nazwa"
        name="Nazwa"
        ref={register({
          validate: (value) => value !== 'admin' || 'Nice try!',
        })}
      /> */}

      <MainInput
        title="Email"
        name="email"
        ref={register({
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
        isError={errors.email}
      />
      {errors.email && errors.email.message}
      <MainInput
        title="Password"
        name="password"
        type="password"
        ref={register({
          required: 'Required',
          validate: (value) => value !== '',
        })}
        isError={errors.password}
      />
      {errors.unit && errors.unit.message}

      <StyledBtn>
        <MainButton type="submit">{isRegister ? 'Sign up' : 'Sign in'}</MainButton>
      </StyledBtn>
    </form>
  );
};

export default LoginForm;
