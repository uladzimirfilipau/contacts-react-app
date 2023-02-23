import { Outlet, Link, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contact = await createContact();
  return { contact };
}

export default function Root() {
  const { contacts } = useLoaderData();

  const contactsItems = contacts.map(({ id, first, last, favorite }) => (
    <li key={id}>
      <Link to={`contacts/${id}`}>
        {first || last ? (
          <>
            {first} {last}
          </>
        ) : (
          <i>No Name</i>
        )}{' '}
        {favorite && <span>★</span>}
      </Link>
    </li>
  ));

  return (
    <>
      <section id='sidebar'>
        <h1>React Router Contacts</h1>

        <div>
          <form id='search-form' role='search'>
            <input
              id='search'
              aria-label='Search contacts'
              placeholder='Search contacts'
              type='search'
              name='search'
            />
            <div id='search-spinner' aria-hidden hidden={true} />
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

      <section id='detail'>
        <Outlet />
      </section>
    </>
  );
}
