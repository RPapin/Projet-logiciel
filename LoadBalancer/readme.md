# Readme

The balancer use a healthpoint system to redirect request to backend. The more health a backend has, the less performant it is.

Health is computed with the following formula :
HEALTH = OS_USED_MEMORY + PACKET_RESPONSE_TIME