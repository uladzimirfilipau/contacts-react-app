import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { updateContact } from '../contacts';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const contact = useLoaderData();
  const { first, last, twitter, avatar, notes } = contact;

  const navigate = useNavigate();

  return (
    <Form method='post' id='contact-form'>
      <p>
        <span>Name</span>
        <input
          placeholder='Firstname'
          aria-label='First name'
          type='text'
          name='first'
          defaultValue={first}
        />
        <input
          placeholder='Lastname'
          aria-label='Last name'
          type='text'
          name='last'
          defaultValue={last}
        />
      </p>

      <label>
        <span>Twitter</span>
        <input type='text' name='twitter' placeholder='@twittername' defaultValue={twitter} />
      </label>

      <label>
        <span>Avatar URL</span>
        <input
          placeholder='https://example.com/avatar.jpg'
          aria-label='Avatar URL'
          type='text'
          name='avatar'
          defaultValue={avatar}
        />
      </label>

      <label>
        <span>Notes</span>
        <textarea
          placeholder='Make some notes...'
          aria-label='Notes'
          name='notes'
          defaultValue={notes}
          rows={6}
        />
      </label>

      <p>
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
