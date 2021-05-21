package com.example.nyurates.jdbcUtil;
import java.sql.*;

public class JdbcUtil {
    private static String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static String USERNAME = "nyurates";
    private static String PASSWORD = "Nyurates2020@";
    private static String URL = "jdbc:mysql//139.224.33.124:3306/nyurates";
    private static Connection connection;

    /**
     *
     * Describe:acquire database connections
     * Param: []
     * Return: java.sql.Connection
     */
    public static Connection getConnection(){


        try {
            Class.forName(DRIVER);
            connection =  DriverManager.getConnection(URL,USERNAME,PASSWORD);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return connection;
    }

    /**
     *
     * Describe:Close database connection
     * Param: [connection, preparedStatement, resultSet]
     * Return: void
     */
    public static void close(Connection connection, PreparedStatement preparedStatement,
                             ResultSet resultSet){
        if(resultSet != null){
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(preparedStatement != null ){
            try {
                preparedStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(connection != null){
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
