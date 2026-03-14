import {Flex} from '@radix-ui/themes'
import {UsersPage} from "./UsersPage.tsx";
import {ReviewersPage} from "./ReviewersPage.tsx";

export const BothPage = () => {
    return (
        <Flex gap="4" style={{height: '100%'}}>
            <Flex direction="column" style={{flex: 1, minWidth: 0}}>
                <UsersPage/>
            </Flex>
            <Flex direction="column" style={{flex: 1, minWidth: 0}}>
                <ReviewersPage/>
            </Flex>
        </Flex>
    )
}