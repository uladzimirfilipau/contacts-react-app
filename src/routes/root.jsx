import { Outlet, Link } from 'react-router-dom';

export default function Root() {
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

          <form method='post'>
            <button type='submit'>Add</button>
          </form>
        </div>

        <nav>
          <Link to={`/contacts/1`}>Your Name</Link>
          <Link to={`/contacts/2`}>Your Friend</Link>
        </nav>
      </section>
      <section id='detail'>
        <Outlet />
      </section>
    </>
  );
}
