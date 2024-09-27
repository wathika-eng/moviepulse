import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../Contexts/AppContext';
import { toast } from 'react-toastify';

function LoginModal({ isOpen, onClose }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		password2: '',
		first_name: '',
		last_name: '',
	});
	const [isRegister, setIsRegister] = useState(false);

	const navigate = useNavigate();
	const { login, register } = useApp();

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			navigate('/home');
		}
	}, [navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let success;
			if (isRegister) {
				if (formData.password !== formData.password2) {
					toast.error('Passwords do not match!');
					return;
				}

				success = await register({
					email: formData.email,
					first_name: formData.first_name,
					last_name: formData.last_name,
					password: formData.password,
					password2: formData.password2,
				});
			} else {
				success = await login({
					email: formData.email,
					password: formData.password,
				});
			}

			if (success) {
				toast.success(
					isRegister ? 'Registration successful' : 'Login successful'
				);
				navigate('/home');
				onClose();
			} else {
				toast.error('Authentication failed. Please try again.');
			}
		} catch (error) {
			toast.error('An error occurred. Please try again.');
		}
	};

	const toggleIsRegister = () => {
		setIsRegister(!isRegister);
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white p-8 rounded-lg w-96 max-w-md'>
				<div
					className='flex justify-end text-[#0d1f33] cursor-pointer'
					onClick={toggleIsRegister}>
					{isRegister ? 'Login' : 'Register'}
				</div>
				<h2 className='text-2xl font-bold mb-6 text-center'>
					{isRegister ? 'Sign Up' : 'Sign In'}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block mb-2 text-sm font-medium text-gray-700'>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
							required
						/>
					</div>
					{isRegister && (
						<>
							<div className='mb-4'>
								<label
									htmlFor='first_name'
									className='block mb-2 text-sm font-medium text-gray-700'>
									First Name
								</label>
								<input
									type='text'
									id='first_name'
									name='first_name'
									value={formData.first_name}
									onChange={handleChange}
									className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
									required
								/>
							</div>
							<div className='mb-4'>
								<label
									htmlFor='last_name'
									className='block mb-2 text-sm font-medium text-gray-700'>
									Last Name
								</label>
								<input
									type='text'
									id='last_name'
									name='last_name'
									value={formData.last_name}
									onChange={handleChange}
									className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
									required
								/>
							</div>
						</>
					)}
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block mb-2 text-sm font-medium text-gray-700'>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
							required
						/>
					</div>
					{isRegister && (
						<div className='mb-6'>
							<label
								htmlFor='password2'
								className='block mb-2 text-sm font-medium text-gray-700'>
								Confirm Password
							</label>
							<input
								type='password'
								id='password2'
								name='password2'
								value={formData.password2}
								onChange={handleChange}
								className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
								required
							/>
						</div>
					)}
					<button
						type='submit'
						className='w-full bg-[#0d1f33c4] text-white p-2 rounded font-semibold hover:bg-[#0d1f33] transition duration-300'>
						{isRegister ? 'Register' : 'Login'}
					</button>
				</form>
				<button
					onClick={onClose}
					className='mt-4 text-sm text-gray-600 hover:text-gray-800 w-full text-center'>
					Close
				</button>
			</div>
		</div>
	);
}

export default LoginModal;
