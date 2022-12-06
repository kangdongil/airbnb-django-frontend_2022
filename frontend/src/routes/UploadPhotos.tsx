import { Box, Button, Container, FormControl, Heading, Input, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import { getUploadURL, uploadImage } from "./api";

interface IForm {
    file:FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}

export default function UploadPhotos(){
    const { register, handleSubmit, watch } = useForm<IForm>();
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: any) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
        }
    });
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: (data:any) => {
            console.log(data);
        }
    });
    const { roomPk } = useParams();
    const onSubmit = (data:any) => {
        uploadURLMutation.mutate();
    }
    console.log(watch());
    return (
        <ProtectedPage>
            <Box
                pb={40}
                mt={10}
                px={{
                    base: 10,
                    lg: 40,
                }}
            >
                <Container>
                    <Heading textAlign={"center"}>
                        Upload Photos
                    </Heading>
                    <VStack
                        as="form"
                        onSubmit={handleSubmit(onSubmit)}
                        spacing={5}
                        mt={10}
                    >
                        <FormControl>
                            <Input
                                {...register("file")}
                                type="file"
                                accept="image/*"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            w="full"
                            colorScheme={"red"}
                        >
                            Upload Photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}