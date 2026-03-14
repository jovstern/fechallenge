import {Flex, Text} from '@radix-ui/themes';
import {User, USERS_URL} from "../api/apis.ts";
import {useFetchItems} from "../hooks/useFetchItems.ts";
import {InfinityScrollingList} from "../components/infinity-scrolling-list/InfinityScrollingList.tsx";
import {ListHeader} from "../components/list/ListHeader.tsx";
import {RenderItem} from "../components/list/RenderItem.tsx";

export const UsersPage = () => {
    const {
        data,
        status,
        fetchNextPage,
        hasNextPage,
        isFetching,
        inputValue,
        setQuery
    } = useFetchItems({url: USERS_URL});

    const totalItems = data?.pages[0]?.items ?? 0;
    const users = data?.pages.flatMap(page => page.data) ?? [];

    const renderItem = (user: User) => {
        if (!user) return null;

        return (
            <RenderItem item={user} color="indigo"/>
        );
    };

    return (
        <Flex direction="column" gap="4" style={{height: '100%'}}>
            <ListHeader label="Users" totalItems={totalItems} query={inputValue} setQuery={setQuery}/>

            {status === 'pending' && <Text color="gray">Loading...</Text>}
            {status === 'error' && <Text color="red">Error loading users.</Text>}
            {status === 'success' && users.length === 0 && <Text color="gray">No users found.</Text>}
            {status === 'success' && users.length > 0 && (
                <InfinityScrollingList
                    data={users}
                    hasNextPage={hasNextPage}
                    isFetching={isFetching}
                    fetchNextPage={fetchNextPage}
                    renderItem={renderItem}
                    estimateSize={70}
                />
            )}

        </Flex>
    );
};