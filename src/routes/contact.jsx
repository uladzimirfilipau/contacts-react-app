import { Form, useLoaderData, useFetcher } from 'react-router-dom';
import { getContact, updateContact } from '../contacts';

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);

  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return contact;
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}

export default function Contact() {
  const contact = useLoaderData();
  const { avatar, first, last, twitter, notes } = contact;

  return (
    <section id='contact'>
      {contact.avatar ? (
        <img key={avatar} src={avatar} alt={last} />
      ) : (
        <img src={null} alt='No Avatar' />
      )}

      <div>
        <h1>
          {first || last ? (
            <>
              {first} {last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {twitter && (
          <p>
            <a target='_blank' href={`https://twitter.com/${twitter}`} rel='noreferrer'>
              {twitter}
            </a>
          </p>
        )}

        {notes && <p>{notes}</p>}

        <div>
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>

          <Form
            method='post'
            action='destroy'
            onSubmit={(event) => {
              if (!window.confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </section>
  );
}
