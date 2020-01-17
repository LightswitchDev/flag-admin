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
} from '@chakra-ui/core';
import { Formik, Form, Field } from 'formik';

type FieldChildrenProps = {
    field: { onChange: () => void; onBlur: () => void; name: string; value: string };
};
export const SwitchDrawer: React.FunctionComponent<{ btnRef: any; isOpen: boolean; onClose: () => void }> = ({
    btnRef,
    isOpen,
    onClose,
}) => {
    return (
        <Formik
            initialValues={{ name: '', key: '', type: '' }}
            onSubmit={(values, setSubmitting) => {
                console.log(values, setSubmitting);
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
                                <Field
                                    name="name"
                                    render={({ field }: FieldChildrenProps) => <Input placeholder="Name" {...field} />}
                                ></Field>

                                <Field
                                    name="key"
                                    render={({ field }: FieldChildrenProps) => <Input placeholder="Key" {...field} />}
                                ></Field>
                                <Field
                                    name="type"
                                    render={({ field }: FieldChildrenProps) => (
                                        <Select placeholder="select type" {...field}>
                                            <option value="Boolean">Boolean</option>
                                            <option value="Multi">Multi</option>
                                        </Select>
                                    )}
                                ></Field>
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
