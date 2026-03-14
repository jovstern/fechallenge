import {Avatar, Box, Button, Flex, Text} from '@radix-ui/themes';
import * as Popover from "@radix-ui/react-popover";
import {MessageCircle} from "lucide-react";

type Color = 'indigo' | 'teal';

type Item = {
    firstName: string;
    lastName: string;
    email: string;
    catchPhrase: string;
    comments: string;
}

type Props = {
    item: Item;
    color: Color;
}

export const RenderItem = ({item, color}: Props) => {
    return (
        <Flex align="center" gap="3" px="3"
              className={`h-full hover:bg-[var(--${color}-2)] transition-colors cursor-pointer border-b border-[var(--gray-3)]`}>
            <Avatar size="2" radius="full" fallback={item.firstName[0] + item.lastName[0]} color={color}/>

            <Flex gap="9" align="center">
                <Box width="300px">
                    <Text size="2" weight="medium">{item.firstName} {item.lastName}</Text>
                    <Text size="1" color="gray" as="div">{item.email}</Text>
                    <Text size="1" color={color} as="div" truncate>{item.catchPhrase}</Text>
                </Box>
                <Box>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Button variant="soft" size="1" color={color}>
                                <MessageCircle width="12" height="12"/>
                                Comments
                            </Button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                className="w-[400px] p-3 rounded-md z-50 bg-white border border-gray-200 shadow-lg"
                                sideOffset={5}
                            >
                                <Text as="div" className="text-xs text-gray-600 leading-relaxed">
                                    {item.comments}
                                </Text>
                                <Popover.Arrow className="fill-white"/>
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </Box>
            </Flex>
        </Flex>
    );
};
