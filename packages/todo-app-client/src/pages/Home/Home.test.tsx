import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import Home from '.';
import { TaskResponse } from '../../api/tasks/tasks.model';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<Record<string, unknown>>('react-router-dom'),
  Link: () => <div />,
  withRouter: () => '',
}));

beforeEach(() => {
  fetch.resetMocks();
});

test('Given the Home page, when there are no tasks, should show an special message', async () => {
  fetch.mockResponse(JSON.stringify([]));
  render(<Home />);
  await screen.findByText('¿Que quieres hacer hoy?');
});

test('when TodoList is loaded with todos, then the todos should be in the list', async () => {
  const todos: TaskResponse[] = [
    { _id: '1', name: 'review PR' },
    { _id: '2', name: 'update docs' },
  ];
  fetch.mockResponse(JSON.stringify(todos));
  render(<Home />);
  await screen.findAllByText('Realizando operación...');
  await screen.findByText(todos[0].name);
  await screen.findByText(todos[1].name);
});
