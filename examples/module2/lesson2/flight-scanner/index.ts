import { z } from 'zod';

const form = document.querySelector('#flight-form') as HTMLFormElement;
const dateFormatPattern = /^([0-2][0-9]|(3)[0-1])-(((0)[0-9])|((1)[0-2]))-((19|20)\d\d)$/;
const errorsField = document.getElementById('errors')!;
const successField = document.getElementById('success')!;

const formDataSchema = z.object({
  origin: z.string()
    .min(3, { message: 'Origin must be at least 3 characters' })
    .max(50),
  destination: z.string(),
  trip: z.enum(['one-way', 'round-trip']),
  startDate: z.string().regex(dateFormatPattern, { message: 'Date must be in DD-MM-YYYY format' }),
  endDate: z.string().regex(dateFormatPattern, { message: 'Date must be in DD-MM-YYYY format' })
}).refine((data) => data.endDate > data.startDate, {
  message: 'End date date must be after start date',
  path: ['endDate']
});
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  try {
    successField.innerText = '';
    errorsField.innerText = '';
    formDataSchema.parse({
      origin: formData.get('origin') as string,
      destination: formData.get('destination') as string,
      trip: formData.get('trip') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string
    });
    console.log('Booking dates are valid!');
    successField.innerText = 'Form submitted successfully';
  } catch (error) {
    console.error(error?.errors);
    errorsField.innerText = error?.errors?.map((e) => e.message).join('\n');
  }
});
