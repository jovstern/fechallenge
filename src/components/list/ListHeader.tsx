import {Box, Heading, Text, TextField} from "@radix-ui/themes";
import {SearchIcon} from "lucide-react";

type Props = {
    label: string;
    totalItems: number;
    query: string;
    setQuery: (query: string) => void;
}

export const ListHeader = ({label, totalItems, query, setQuery}: Props) => {
    return (
        <Box>
            <Heading size="6">{label}</Heading>
            <Text size="2" color="gray">{totalItems.toLocaleString()} total</Text>
            <Box mt="3">
                <TextField.Root
                    placeholder={`Search ${label}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                >
                    <TextField.Slot>
                        <SearchIcon height="16" width="16"/>
                    </TextField.Slot>
                </TextField.Root>
            </Box>
        </Box>
    )
}