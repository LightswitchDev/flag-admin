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
import { createUpdateSwitch, SwitchFromOrg } from '../data/switches';

export type FieldChildrenProps = {
    field: { onChange: () => void; onBlur: () => void; name: string; value: any };
};

type Props = {
    btnRef: any;
    isOpen: boolean;
    onClose: () => void;
    organizationId: string;
    lightswitch?: SwitchFromOrg;
};

export const SwitchDrawer: React.FunctionComponent<Props> = ({
    btnRef,
    isOpen,
    onClose,
    organizationId,
    lightswitch,
}) => {
    console.log(organizationId, lightswitch);

    return (
        <Formik
            enableReinitialize
            initialValues={lightswitch ?? { name: '', key: '', type: 'Boolean', enabled: true }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                await createUpdateSwitch(
                    organizationId,
                    {
                        name: values.name,
                        key: values.key,
                        type: values.type,
                        enabled: values.enabled,
                    },
                    { shouldMutate: true, shouldRevalidate: false },
                );
                setSubmitting(false);
                onClose();
            }}
        >
            {({ isSubmitting }) => (
                <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef as any}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>{lightswitch ? `Edit ${lightswitch.name}` : 'Create Lightswitch'}</DrawerHeader>
                        <Form>
                            <DrawerBody maxW="m">
                                <Field name="name">
                                    {({ field }: FieldChildrenProps) => (
                                        <Input marginBottom="4px" placeholder="Name" {...field} />
                                    )}
                                </Field>

                                <Field name="key">
                                    {({ field }: FieldChildrenProps) => (
                                        <Input marginBottom="4px" placeholder="Key" {...field} />
                                    )}
                                </Field>
                                <Field name="type">
                                    {({ field }: FieldChildrenProps) => (
                                        <Select marginBottom="4px" maxW="m" {...field}>
                                            <option value="Boolean">Boolean</option>
                                            <option value="Multi">Multi</option>
                                        </Select>
                                    )}
                                </Field>
                                <Field name="enabled">
                                    {({ field }: FieldChildrenProps) => (
                                        <Switch
                                            marginBottom="4px"
                                            placeholder="select type"
                                            isChecked={field.value}
                                            {...field}
                                        />
                                    )}
                                </Field>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant="outline" mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" isLoading={isSubmitting}>
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
