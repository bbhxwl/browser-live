//输入网址，srs的推流网址，不用写https://，写域名或者ip既可以
export default "域名";

//推流的地址一定要支持https，不然会报错
//docker run -itd --env CANDIDATE=外网ip --restart=always     -p 1935:1935 -p 8080:8080 -p 1985:1985 -p 8000:8000/udp    ossrs/srs:v4

