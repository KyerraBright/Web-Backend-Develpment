INSERT INTO public.account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
) VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
);
UPDATE public."account"
SET "account_type" = 'Admin'
WHERE "account_firstname" = 'Tony' AND "account_lastname" = 'Stark';
DELETE FROM public."account"
WHERE "account_firstname" = 'Tony' AND "account_lastname" = 'Stark';

UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'large interiors')
WHERE inv_id = 10;

SELECT
    i.inv_make,
    i.inv_model,
    c.classification_name
FROM
    public.inventory i
INNER JOIN
    public.classification c ON i.classification_id = c.classification_id
WHERE
    c.classification_name = 'Sport';

UPDATE public.inventory
SET
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thubnail = REPLACE(inv_thubnail, '/images/', '/images/vehicles/');


