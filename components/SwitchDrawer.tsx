import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Select,
    Switch,
} from '@chakra-ui/core';
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_SWITCH, SwitchFromOrg, GET_SWITCHES_BY_ORG } from '../gql/switches';

type FieldChildrenProps = {
    field: { onChange: () => void; onBlur: () => void; name: string; value: any };
};

export const SwitchDrawer: React.FunctionComponent<{ btnRef: any; isOpen: boolean; onClose: () => void }> = ({
    btnRef,
    isOpen,
    onClose,
}) => {
    const [createSwitch] = useMutation<{ createOneSwitch: SwitchFromOrg }>(CREATE_SWITCH, {
        update(cache, { data }) {
            const res = cache.readQuery<{ switches: SwitchFromOrg[] }>({
                query: GET_SWITCHES_BY_ORG,
                variables: { id: 'ck5dcn0980000ixw1e9fjiqfh' },
            });
            cache.writeQuery({
                query: GET_SWITCHES_BY_ORG,
                data: { switches: [...(res?.switches ?? []), data?.createOneSwitch] },
                variables: { id: 'ck5dcn0980000ixw1e9fjiqfh' },
            });
        },
    });
    return (
        <Formik
            initialValues={{ name: '', key: '', type: 'Boolean', enabled: true }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const variables = {
                    switch: {
                        name: values.name,
                        key: values.key,
                        type: values.type,
                        enabled: values.enabled,
                        organization: {
                            connect: {
                                id: 'ck5dcn0980000ixw1e9fjiqfh',
                            },
                        },
                        variants:
                            values.type === 'Boolean'
                                ? {
                                      create: [
                                          {
                                              value: 'true',
                                          },
                                          {
                                              value: 'true',
                                          },
                                      ],
                                  }
                                : undefined,
                    },
                };
                const result = await createSwitch({ variables });
                setSubmitting(false);
                onClose();
                console.log(result);
            }}
        >
            {({ isSubmitting }) => (
                <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef as any}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create Switch</DrawerHeader>
                        <Form>
                            <DrawerBody>
                                <Field name="name">
                                    {({ field }: FieldChildrenProps) => <Input placeholder="Name" {...field} />}
                                </Field>

                                <Field name="key">
                                    {({ field }: FieldChildrenProps) => <Input placeholder="Key" {...field} />}
                                </Field>
                                <Field name="type">
                                    {({ field }: FieldChildrenProps) => (
                                        <Select {...field}>
                                            <option value="Boolean">Boolean</option>
                                            <option value="Multi">Multi</option>
                                        </Select>
                                    )}
                                </Field>
                                <Field name="enabled">
                                    {({ field }: FieldChildrenProps) => (
                                        <Switch placeholder="select type" isChecked={field.value} {...field} />
                                    )}
                                </Field>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant="outline" mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="blue" isLoading={isSubmitting}>
                                    Save
                                </Button>
                            </DrawerFooter>
                        </Form>
                    </DrawerContent>
                </Drawer>
            )}
        </Formik>
    );
};
