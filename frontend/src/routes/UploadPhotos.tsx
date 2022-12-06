import { Box, Button, Container, FormControl, Heading, Input, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import { createPhoto, getUploadURL, uploadImage } from "./api";

interface IForm {
    file:FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}

export default function UploadPhotos(){
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            console.log("Photo Finished")
            toast({
                status: "success",
                title: "Image uploaded!",
                description: "Feel free to upload more images",
                isClosable: true,
            });
            reset();
        },
    });
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }:any) => {
            console.log("Image start")
            if (roomPk) {
                console.log("Image Finished")
                createPhotoMutation.mutate({
                    description: "Anyany",
                    file: `https://imagedelivery.net/04Xs58HQUYKnAiRS0ZcioA/${result.id}/public`,
                    roomPk,
                });
            }
        }
    });
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            console.log("URL Finished")
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
        }
    });
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
                            isLoading={ createPhotoMutation.isLoading || uploadImageMutation.isLoading || uploadURLMutation.isLoading }
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