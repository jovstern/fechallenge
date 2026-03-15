import {Flex} from '@radix-ui/themes'
import {UsersPage} from "./UsersPage.tsx";
import {ReviewersPage} from "./ReviewersPage.tsx";

export const BothPage = () => {
    return (
        <Flex gap="4" style={{height: '100%'}}>
            <Flex direction="column" className="flex-1 min-w-0">
                <UsersPage/>
            </Flex>
            <Flex direction="column" className="flex-1 min-w-0">
                <ReviewersPage/>
            </Flex>
        </Flex>
    )
}