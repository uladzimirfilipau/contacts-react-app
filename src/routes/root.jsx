import { useEffect } from 'react';
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const contacts = await getContacts(search);
  return { contacts, search };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, search } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const contactsItems = contacts.map(({ id, first, last, favorite }) => (
    <li key={id}>
      <NavLink
        to={`contacts/${id}`}
        className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
      >
        {first || last ? (
          <>
            {first} {last}
          </>
        ) : (
          <i>No Name</i>
        )}{' '}
        {favorite && <span>★</span>}
      </NavLink>
    </li>
  ));

  const handleChange = (event) => {
    const isFirstSearch = search == null;
    submit(event.currentTarget.form, {
      replace: !isFirstSearch,
    });
  };

  const searching =
    navigation.location && new URLSearchParams(navigation.location.search).has('search');

  useEffect(() => {
    document.getElementById('search').value = search;
  }, [search]);

  return (
    <>
      <section id='sidebar'>
        <h1>React Router Contacts</h1>

        <div>
          <form id='search-form' role='search'>
            <input
              className={searching ? 'loading' : ''}
              id='search'
              aria-label='Search contacts'
              placeholder='Search contacts'
              type='search'
              name='search'
              defaultValue={search}
              onChange={handleChange}
            />
            <div id='search-spinner' aria-hidden hidden={!searching} />
            <div className='sr-only' aria-live='polite' />
          </form>

          <Form method='post'>
            <button type='submit'>New</button>
          </Form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>{contactsItems}</ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </section>

      <section id='detail' className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </section>
    </>
  );
}
